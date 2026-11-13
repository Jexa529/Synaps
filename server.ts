import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_BOT_ID = '1561000507206672395';
const DISCORD_EPOCH = 1420070400000n;

interface DiscordRpcAppResponse {
  id?: string;
  name?: string;
  icon?: string | null;
  description?: string;
  is_verified?: boolean;
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  flags?: number;
  install_params?: {
    scopes?: string[];
    permissions?: string;
  };
  bot?: {
    id?: string;
    username?: string;
    global_name?: string | null;
    avatar?: string | null;
    discriminator?: string;
    public_flags?: number;
    banner?: string | null;
    bot?: boolean;
  };
}

interface DiscordGatewayResponse {
  url?: string;
}

interface DiscordStatusSummaryResponse {
  status?: {
    indicator?: string;
    description?: string;
  };
  components?: Array<{
    id: string;
    name: string;
    status: string;
  }>;
}

function getCreatedAtFromSnowflake(snowflakeId: string): string | null {
  try {
    const id = BigInt(snowflakeId);
    const timestamp = Number((id >> 22n) + DISCORD_EPOCH);
    return new Date(timestamp).toISOString();
  } catch {
    return null;
  }
}

async function fetchWithTiming<T>(
  url: string
): Promise<{ ok: boolean; status: number; data: T | null; latencyMs: number; error?: string }> {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SynapsStatusMonitor/1.0',
        Accept: 'application/json',
      },
    });
    const latencyMs = Math.round(performance.now() - start);
    if (!res.ok) {
      return { ok: false, status: res.status, data: null, latencyMs, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as T;
    return { ok: true, status: res.status, data, latencyMs };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      ok: false,
      status: 0,
      data: null,
      latencyMs,
      error: err instanceof Error ? err.message : 'Request failed',
    };
  } finally {
    clearTimeout(timer);
  }
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Tokenless Live Discord Bot Status API for Bot ID 1561000507206672395
  app.get('/api/status', async (_req, res) => {
    const botId = (process.env.DISCORD_BOT_ID || DEFAULT_BOT_ID).trim() || DEFAULT_BOT_ID;

    const [rpcResult, gatewayResult, discordStatusResult] = await Promise.all([
      fetchWithTiming<DiscordRpcAppResponse>(
        `https://discord.com/api/v10/applications/${botId}/rpc`
      ),
      fetchWithTiming<DiscordGatewayResponse>('https://discord.com/api/v10/gateway'),
      fetchWithTiming<DiscordStatusSummaryResponse>(
        'https://discordstatus.com/api/v2/summary.json'
      ),
    ]);

    const appData = rpcResult.data;
    const botUser = appData?.bot;
    const avatarHash = botUser?.avatar || appData?.icon || null;
    const bannerHash = botUser?.banner || null;

    const avatarUrl = avatarHash
      ? `https://cdn.discordapp.com/avatars/${botId}/${avatarHash}.${
          avatarHash.startsWith('a_') ? 'gif' : 'png'
        }?size=256`
      : null;

    const bannerUrl = bannerHash
      ? `https://cdn.discordapp.com/banners/${botId}/${bannerHash}.${
          bannerHash.startsWith('a_') ? 'gif' : 'png'
        }?size=600`
      : null;

    const relevantComponents = (discordStatusResult.data?.components || [])
      .filter((c) => ['API', 'Gateway', 'Media Proxy', 'Push Notifications', 'Voice'].includes(c.name))
      .slice(0, 5)
      .map((c) => ({
        id: c.id,
        name: c.name,
        status: c.status,
      }));

    res.setHeader('Cache-Control', 'no-store, max-age=0');

    res.status(rpcResult.ok || gatewayResult.ok ? 200 : 502).json({
      ok: rpcResult.ok,
      checkedAt: new Date().toISOString(),
      botId,
      bot: {
        id: appData?.id || botId,
        name: appData?.name || botUser?.username || 'Synaps',
        username: botUser?.username || appData?.name || 'Synaps',
        discriminator: botUser?.discriminator || '0000',
        tag:
          botUser?.discriminator && botUser.discriminator !== '0'
            ? `${botUser.username || 'Synaps'}#${botUser.discriminator}`
            : `@${botUser?.username || 'Synaps'}`,
        description: appData?.description || '',
        avatarUrl,
        bannerUrl,
        isVerified: Boolean(appData?.is_verified),
        botPublic: Boolean(appData?.bot_public),
        requireCodeGrant: Boolean(appData?.bot_require_code_grant),
        publicFlags: botUser?.public_flags ?? appData?.flags ?? 0,
        installScopes: appData?.install_params?.scopes || [],
        termsOfServiceUrl: appData?.terms_of_service_url || null,
        privacyPolicyUrl: appData?.privacy_policy_url || null,
        createdAt: getCreatedAtFromSnowflake(botId),
      },
      metrics: {
        apiStatus: rpcResult.ok ? 'operational' : 'degraded',
        apiLatencyMs: rpcResult.latencyMs,
        gatewayStatus: gatewayResult.ok ? 'operational' : 'degraded',
        gatewayLatencyMs: gatewayResult.latencyMs,
        gatewayUrl: gatewayResult.data?.url || 'wss://gateway.discord.gg',
      },
      discordPlatform: {
        indicator: discordStatusResult.data?.status?.indicator || 'unknown',
        description: discordStatusResult.data?.status?.description || 'Unavailable',
        components: relevantComponents,
      },
      errors: {
        rpc: rpcResult.ok ? null : rpcResult.error || 'Failed to fetch bot application data',
        gateway: gatewayResult.ok ? null : gatewayResult.error || 'Failed to reach Discord gateway',
      },
    });
  });

  const SUGGESTION_WEBHOOK_URL =
    'https://discord.com/api/webhooks/1570781668518662146/ta8Nnqf-zTpwzV1Qgoj4_viKNQ8zs2HGiqRvruWn8NA2rTKUILT1J-YgejjNExZN2aJl';
  const BUG_WEBHOOK_URL =
    'https://discord.com/api/webhooks/1570781900275195934/iH0eQTdzeAeCjErhEmyrSICJh2-fgv_8Nt1nmP1S4KK3I9boJpobOSppA-Z60IYT5J0r';
  const FALLBACK_SYNAPS_AVATAR =
    'https://cdn.discordapp.com/avatars/1561000507206672395/769aa92c8d3a01eae57a5c18c9720b16.png?size=256';

  let cachedSynapsAvatarUrl = FALLBACK_SYNAPS_AVATAR;

  async function resolveSynapsAvatarUrl(botId: string): Promise<string> {
    try {
      const rpc = await fetchWithTiming<DiscordRpcAppResponse>(
        `https://discord.com/api/v10/applications/${botId}/rpc`
      );
      const hash = rpc.data?.bot?.avatar || rpc.data?.icon;
      if (hash) {
        cachedSynapsAvatarUrl = `https://cdn.discordapp.com/avatars/${botId}/${hash}.${
          hash.startsWith('a_') ? 'gif' : 'png'
        }?size=256`;
      }
    } catch {
      // Keep cached fallback avatar
    }
    return cachedSynapsAvatarUrl;
  }

  // Discord Components V2 Webhook Endpoint for Feedback & Bug Reports (no timestamp, no default emojis)
  app.post('/api/feedback', async (req, res) => {
    try {
      const { category, subject, message, contact } = req.body as {
        category?: string;
        subject?: string;
        message?: string;
        contact?: string;
      };

      const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 140) : '';
      const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 2000) : '';
      const cleanContact = typeof contact === 'string' ? contact.trim().slice(0, 80) : '';
      const cleanCategory =
        category === 'bug' || category === 'improvement' || category === 'suggestion'
          ? category
          : 'suggestion';

      if (cleanSubject.length < 2 || cleanMessage.length < 5) {
        return res.status(400).json({ ok: false, error: 'Subject and details are required.' });
      }

      const isBug = cleanCategory === 'bug';
      const webhookUrl = isBug ? BUG_WEBHOOK_URL : SUGGESTION_WEBHOOK_URL;
      const categoryHeading = isBug
        ? 'Yeni Hata Bildirimi'
        : cleanCategory === 'improvement'
        ? 'Yeni Komut Iyileştirmesi'
        : 'Yeni Özellik Önerisi';

      const botId = (process.env.DISCORD_BOT_ID || DEFAULT_BOT_ID).trim() || DEFAULT_BOT_ID;
      const avatarUrl = await resolveSynapsAvatarUrl(botId);

      const detailsLines = [
        `**Kategori:** ${isBug ? 'Hata Bildirimi' : cleanCategory === 'improvement' ? 'Komut İyileştirmesi' : 'Özellik Önerisi'}`,
        `**Konu:** ${cleanSubject}`,
      ];
      if (cleanContact) {
        detailsLines.push(`**Gönderen:** ${cleanContact}`);
      }

      // Discord Components V2 payload (flags: 32768 = IS_COMPONENTS_V2, ?with_components=true)
      const payload = {
        username: 'Synaps',
        avatar_url: avatarUrl,
        flags: 1 << 15,
        components: [
          {
            type: 17,
            accent_color: isBug ? 0x18181b : 0x14532d,
            components: [
              {
                type: 10,
                content: `### ${categoryHeading}\n${detailsLines.join('\n')}`,
              },
              {
                type: 14,
                divider: true,
                spacing: 1,
              },
              {
                type: 10,
                content: `**Detaylar**\n${cleanMessage}`,
              },
            ],
          },
        ],
      };

      const discordRes = await fetch(`${webhookUrl}?with_components=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!discordRes.ok) {
        const errBody = await discordRes.text().catch(() => '');
        return res.status(502).json({
          ok: false,
          error: `Discord webhook rejected request (${discordRes.status})`,
          details: errBody.slice(0, 200),
        });
      }

      return res.json({ ok: true });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: err instanceof Error ? err.message : 'Failed to deliver feedback',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Synaps web server running on http://localhost:${port}`);
  });
}

startServer();
