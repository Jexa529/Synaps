import { BotCommand } from '../types';

export const BOT_ID = '1561000507206672395';
export const BOT_INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${BOT_ID}&scope=bot%20applications.commands&permissions=8`;
export const SUPPORT_SERVER_URL = 'https://discord.gg/synap';

export const BOT_COMMANDS: BotCommand[] = [
  // Economy
  {
    name: 's!balance',
    category: 'economy',
    description: 'Check your current wallet balance, bank deposits, and overall net worth.',
    usage: 's!balance [@user]',
    options: [{ name: 'user', description: 'Optional member to inspect', required: false }],
  },
  {
    name: 's!bank',
    category: 'economy',
    description: 'View your bank account details, vault capacity, and daily compounding interest.',
    usage: 's!bank [deposit/withdraw/upgrade] [amount]',
    options: [
      { name: 'action', description: 'deposit, withdraw, or upgrade', required: false },
      { name: 'amount', description: 'Amount of coins to move', required: false },
    ],
  },
  {
    name: 's!daily',
    category: 'economy',
    description: 'Claim your 24-hour daily coin stipend and maintain your active streak bonus.',
    usage: 's!daily',
  },
  {
    name: 's!deposit',
    category: 'economy',
    description: 'Safely transfer coins from your wallet into your protected bank vault.',
    usage: 's!deposit <amount | all>',
    options: [{ name: 'amount', description: 'Number of coins to deposit', required: true }],
  },
  {
    name: 's!withdraw',
    category: 'economy',
    description: 'Withdraw coins from your bank vault into your wallet for shopping and betting.',
    usage: 's!withdraw <amount | all>',
    options: [{ name: 'amount', description: 'Number of coins to withdraw', required: true }],
  },
  {
    name: 's!transfer',
    category: 'economy',
    description: 'Directly send coins from your wallet to another community member.',
    usage: 's!transfer @user <amount>',
    options: [
      { name: 'user', description: 'Recipient user mention', required: true },
      { name: 'amount', description: 'Coins to transfer', required: true },
    ],
  },
  {
    name: 's!leaderboard',
    category: 'economy',
    description: 'Display server rankings for highest net worth, active levels, or win streaks.',
    usage: 's!leaderboard [economy | level | streak]',
    options: [{ name: 'type', description: 'Ranking category', required: false }],
  },
  {
    name: 's!rob',
    category: 'economy',
    description: 'Attempt to sneakily pickpocket another member wallet with risk of fine if caught.',
    usage: 's!rob @user',
    options: [{ name: 'user', description: 'Target user with wallet funds', required: true }],
  },
  {
    name: 's!crime',
    category: 'economy',
    description: 'Commit high-stakes illicit activities for huge payouts or jail sentences.',
    usage: 's!crime',
  },
  {
    name: 's!pray',
    category: 'economy',
    description: 'Offer a humble prayer to receive a divine blessing, rare item, or small coin bounty.',
    usage: 's!pray',
  },

  // Profession
  {
    name: 's!work',
    category: 'profession',
    description: 'Complete your job shift to earn your regular hourly salary and work XP.',
    usage: 's!work',
  },
  {
    name: 's!myjob',
    category: 'profession',
    description: 'View your current job title, promotion requirements, salary, and shift cooldown.',
    usage: 's!myjob',
  },
  {
    name: 's!professions',
    category: 'profession',
    description: 'Browse the catalog of available server careers, tier requirements, and pay rates.',
    usage: 's!professions',
  },
  {
    name: 's!resign',
    category: 'profession',
    description: 'Resign from your current occupation to apply for a higher-tier career.',
    usage: 's!resign',
  },
  {
    name: 's!beg',
    category: 'profession',
    description: 'Ask fellow server citizens for spare pocket coins when your wallet is empty.',
    usage: 's!beg',
  },

  // Moderation & Server Security
  {
    name: 's!ban',
    category: 'moderation',
    description: 'Permanently ban a malicious user from the server with optional message cleanup.',
    usage: 's!ban @user [days] [reason]',
    permissions: 'Ban Members',
    options: [
      { name: 'user', description: 'User mention or ID', required: true },
      { name: 'days', description: 'Days of messages to delete (0-7)', required: false },
      { name: 'reason', description: 'Reason for audit log', required: false },
    ],
  },
  {
    name: 's!kick',
    category: 'moderation',
    description: 'Kick a member from the server while leaving them able to rejoin via invite.',
    usage: 's!kick @user [reason]',
    permissions: 'Kick Members',
    options: [
      { name: 'user', description: 'User mention or ID', required: true },
      { name: 'reason', description: 'Reason for audit log', required: false },
    ],
  },
  {
    name: 's!timeout',
    category: 'moderation',
    description: 'Temporarily mute and isolate a disruptive member for a specific duration.',
    usage: 's!timeout @user <duration> [reason]',
    permissions: 'Moderate Members',
    options: [
      { name: 'user', description: 'User mention', required: true },
      { name: 'duration', description: 'e.g. 10m, 1h, 1d', required: true },
      { name: 'reason', description: 'Reason for audit log', required: false },
    ],
  },
  {
    name: 's!unmute',
    category: 'moderation',
    description: 'Remove active timeouts and restore normal communication permissions to a user.',
    usage: 's!unmute @user',
    permissions: 'Moderate Members',
    options: [{ name: 'user', description: 'User mention', required: true }],
  },
  {
    name: 's!warn',
    category: 'moderation',
    description: 'Issue an official recorded strike against a member with automated escalation.',
    usage: 's!warn @user <reason>',
    permissions: 'Moderate Members',
    options: [
      { name: 'user', description: 'User mention', required: true },
      { name: 'reason', description: 'Strike explanation', required: true },
    ],
  },
  {
    name: 's!warnings',
    category: 'moderation',
    description: 'View the complete moderation disciplinary log and strike history of a member.',
    usage: 's!warnings @user',
    permissions: 'Moderate Members',
    options: [{ name: 'user', description: 'User mention', required: true }],
  },
  {
    name: 's!clear',
    category: 'moderation',
    description: 'Bulk delete a specified number of recent messages from the current channel.',
    usage: 's!clear <amount 1-100> [@user]',
    permissions: 'Manage Messages',
    options: [
      { name: 'amount', description: 'Number of messages (up to 100)', required: true },
      { name: 'user', description: 'Only delete messages from this user', required: false },
    ],
  },
  {
    name: 's!lock',
    category: 'moderation',
    description: 'Instantly lock down a channel to prevent everyone from sending messages.',
    usage: 's!lock [#channel] [reason]',
    permissions: 'Manage Channels',
    options: [{ name: 'channel', description: 'Channel to lock', required: false }],
  },
  {
    name: 's!unlock',
    category: 'moderation',
    description: 'Unlock a previously restricted channel to resume normal community chat.',
    usage: 's!unlock [#channel]',
    permissions: 'Manage Channels',
    options: [{ name: 'channel', description: 'Channel to unlock', required: false }],
  },
  {
    name: 's!slowmode',
    category: 'moderation',
    description: 'Set a custom rate limit cooldown per user in the current channel.',
    usage: 's!slowmode <seconds>',
    permissions: 'Manage Channels',
    options: [{ name: 'seconds', description: 'Cooldown interval (0-21600)', required: true }],
  },
  {
    name: 's!protection',
    category: 'moderation',
    description: 'Configure automated anti-raid, phishing domain filter, and anti-spam shields.',
    usage: 's!protection [on | off | status]',
    permissions: 'Administrator',
  },
  {
    name: 's!auto-role',
    category: 'moderation',
    description: 'Set up automatic roles assigned immediately to members upon joining the guild.',
    usage: 's!auto-role <@role | remove>',
    permissions: 'Manage Roles',
  },
  {
    name: 's!ticket-panel',
    category: 'moderation',
    description: 'Deploy an interactive support ticket embed with select buttons.',
    usage: 's!ticket-panel [#channel]',
    permissions: 'Administrator',
  },
  {
    name: 's!ticket-settings',
    category: 'moderation',
    description: 'Configure support staff roles, category containers, and HTML transcript logging.',
    usage: 's!ticket-settings [role | category | logs]',
    permissions: 'Administrator',
  },

  // Gambling
  {
    name: 's!coinflip',
    category: 'gambling',
    description: 'Wager coins on a 50/50 heads or tails coin toss with 2x payout.',
    usage: 's!coinflip <heads | tails> <bet>',
    options: [
      { name: 'choice', description: 'heads or tails', required: true },
      { name: 'bet', description: 'Coins to wager', required: true },
    ],
  },
  {
    name: 's!dice',
    category: 'gambling',
    description: 'Roll dice against Synaps to win multipliers based on your outcome.',
    usage: 's!dice <bet>',
    options: [{ name: 'bet', description: 'Coins to wager', required: true }],
  },
  {
    name: 's!roulette',
    category: 'gambling',
    description: 'Play European roulette betting on red (2x), black (2x), or green zero (14x).',
    usage: 's!roulette <red | black | green> <bet>',
    options: [
      { name: 'color', description: 'red, black, or green', required: true },
      { name: 'bet', description: 'Coins to wager', required: true },
    ],
  },
  {
    name: 's!slots',
    category: 'gambling',
    description: 'Spin the vintage 3-reel slot machine for jackpot multipliers.',
    usage: 's!slots <bet>',
    options: [{ name: 'bet', description: 'Coins to wager', required: true }],
  },
  {
    name: 's!fastclick',
    category: 'gambling',
    description: 'Test your reflexes against an interactive reaction button with wager stakes.',
    usage: 's!fastclick <bet>',
    options: [{ name: 'bet', description: 'Coins to wager', required: true }],
  },
  {
    name: 's!guessnumber',
    category: 'gambling',
    description: 'Guess the hidden number between 1 and 10 within 3 interactive tries.',
    usage: 's!guessnumber <bet>',
    options: [{ name: 'bet', description: 'Coins to wager', required: true }],
  },

  // Market & Inventory
  {
    name: 's!market',
    category: 'market',
    description: 'Browse the server market catalog for cosmetic roles, badges, and boosters.',
    usage: 's!market [page]',
  },
  {
    name: 's!buy',
    category: 'market',
    description: 'Purchase an item or utility booster from the community market.',
    usage: 's!buy <item_id> [amount]',
    options: [
      { name: 'item_id', description: 'Catalog item identifier', required: true },
      { name: 'amount', description: 'Quantity to purchase', required: false },
    ],
  },
  {
    name: 's!sell',
    category: 'market',
    description: 'Sell items from your inventory back to the market for a fair coin refund.',
    usage: 's!sell <item_id> [amount]',
  },
  {
    name: 's!inventory',
    category: 'market',
    description: 'View your owned collectibles, powerups, badges, and equipped items.',
    usage: 's!inventory [@user]',
  },
  {
    name: 's!use',
    category: 'market',
    description: 'Consume or equip an active item from your inventory.',
    usage: 's!use <item_id>',
  },
  {
    name: 's!background',
    category: 'market',
    description: 'Customize and equip panoramic background wallpapers on your profile card.',
    usage: 's!background [set | list | buy] [id]',
  },
  {
    name: 's!stockmarket',
    category: 'market',
    description: 'View dynamic guild commodity shares with shifting hourly values.',
    usage: 's!stockmarket [view | buy | sell]',
  },

  // Utility
  {
    name: 's!help',
    category: 'utility',
    description: 'Open the clean interactive help guide with categorized dropdowns.',
    usage: 's!help [command | category]',
  },
  {
    name: 's!ping',
    category: 'utility',
    description: 'Check the real-time Discord API latency and WebSocket gateway heartbeat.',
    usage: 's!ping',
  },
  {
    name: 's!serverinfo',
    category: 'utility',
    description: 'Display detailed server information, creation date, member counts, and roles.',
    usage: 's!serverinfo',
  },
  {
    name: 's!userinfo',
    category: 'utility',
    description: 'View Discord registration date, server join date, roles, and status of a member.',
    usage: 's!userinfo [@user]',
  },
  {
    name: 's!avatar',
    category: 'utility',
    description: 'Get a full-resolution downloadable image of any member Discord avatar.',
    usage: 's!avatar [@user]',
  },
  {
    name: 's!level',
    category: 'utility',
    description: 'Check your current chat level, XP progress, and server rank card.',
    usage: 's!level [@user]',
  },
  {
    name: 's!roles',
    category: 'utility',
    description: 'View a complete organized list of all server roles and member tallies.',
    usage: 's!roles',
  },
  {
    name: 's!poll',
    category: 'utility',
    description: 'Create an interactive reaction-based poll for the community to vote on.',
    usage: 's!poll "Question" "Option 1" "Option 2"',
  },
  {
    name: 's!remind',
    category: 'utility',
    description: 'Set a private or channel reminder with a custom timer.',
    usage: 's!remind <time: e.g. 30m, 2h> <message>',
  },
  {
    name: 's!invite',
    category: 'utility',
    description: 'Get the official bot invite link to add Synaps to your Discord server.',
    usage: 's!invite',
  },
  {
    name: 's!support',
    category: 'utility',
    description: 'Receive the direct invitation link to the official Synaps support server.',
    usage: 's!support',
  },

  // User & Social
  {
    name: 's!profile',
    category: 'user',
    description: 'Generate your customized visual user card with level, badges, and bio.',
    usage: 's!profile [@user]',
  },
  {
    name: 's!rank',
    category: 'user',
    description: 'View your activity level, XP progress bar, and server leaderboard position.',
    usage: 's!rank [@user]',
  },
  {
    name: 's!badges',
    category: 'user',
    description: 'Inspect earned achievement badges, tournament ribbons, and guild trophies.',
    usage: 's!badges [@user]',
  },
  {
    name: 's!marry',
    category: 'user',
    description: 'Propose a virtual marriage to a server companion with shared profile card rings.',
    usage: 's!marry @user',
  },
  {
    name: 's!divorce',
    category: 'user',
    description: 'End a virtual server marriage and split common decorative assets.',
    usage: 's!divorce',
  },
];
