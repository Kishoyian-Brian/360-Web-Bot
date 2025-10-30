import { Ctx, Start, Update, Hears, Action, Command } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
@Update()
export class BotUpdate {
  // Runs when user presses "Start" or visits ?start=welcome
  @Start()
  async start(@Ctx() ctx: Context) {
    try {
      const webUrl = process.env.WEB_URL || '';
      
      const cashAppKeyboard = Markup.inlineKeyboard([
        [Markup.button.webApp('🛒 BUY NOW', webUrl)],
      ]);

      // Extract start payload from the command text
      const payload = ctx.message && 'text' in ctx.message 
        ? ctx.message.text.split(' ')[1] 
        : undefined;

      if (payload === 'welcome') {
        // Send welcome image with caption
        await ctx.replyWithPhoto(
          'https://i.pinimg.com/originals/6c/7b/29/6c7b296c4a3e4c0ca659e85c29a2c7da.png',
          {
            caption: '👋 Welcome to WIILIAM SMITH EMPIRE! Glad to have you here.\n\nThis is a beautiful welcome image for you! 🌟',
            ...cashAppKeyboard
          }
        );
      } else {
        // Send regular welcome with image
        await ctx.replyWithPhoto(
          'https://i.pinimg.com/originals/6c/7b/29/6c7b296c4a3e4c0ca659e85c29a2c7da.png',
          {
            caption: `👋 Hello ${ctx.from?.first_name || 'there'}!\nWelcome to SnowdenEmpre 😊\nUse /help to see what I can do.\n\n📘 Here is a list of our available products:\n\n🛒 How to Purchase on Our Website
Tap the bot icon at the bottom-left corner — it will direct you to our shop (DApp) connected with Telegram.
Browse through the shop and explore our available products.

📋 Available Products:
• BANKLOGS
• CC & CVV
• CLONE CARD
• TRANSFERS
• LINKABLES
• AND MORE

If you're interested in any product, click it and add to your cart.
Proceed to checkout and complete your payment as instructed.
Submit your payment proof after checkout.
Finally, message the admin (contact provided in the shop) for verification and further assistance.
💬 For any help or clarification, feel free to reach out — we're here to guide you through every step.`,
            ...cashAppKeyboard
          }
        );
      }
    } catch (error) {
      console.error('Error in start command:', error);
      await ctx.reply('❌ Sorry, something went wrong. Please try again later.');
    }
  }

  @Command('help')
  async help(@Ctx() ctx: Context) {
    try {
      const helpUrl = process.env.HELP_URL || '';
      
      const helpKeyboard = Markup.inlineKeyboard([
        [Markup.button.url('📞 Contact Support', helpUrl)],
      ]);

      const helpMessage = `🆘 Help & Support

Need assistance? Here's how we can help:

🛒 How to Purchase:
• Click "Command Start" to learn how our system works
• Tap the bot icon at the bottom-left corner
• Browse our shop and add products to cart
• Complete checkout and payment
• Submit payment proof and contact admin

💬 Contact Support:
For any questions or issues, please reach out to our admin team using the button below. They're here to help you through every step.

Use the /start command anytime to see the full purchase guide.`;

      await ctx.reply(helpMessage, helpKeyboard);
    } catch (error) {
      console.error('Error in help command:', error);
      await ctx.reply('❌ Sorry, something went wrong. Please try again later.');
    }
  }

  @Command('products')
  async products(@Ctx() ctx: Context) {
    try {
      const webUrl = process.env.WEB_URL || '';
      
      const productsKeyboard = Markup.inlineKeyboard([
        [Markup.button.webApp('🛒 BUY NOW', webUrl)],
        [Markup.button.url('📞 Contact Support', process.env.HELP_URL || '')],
      ]);

      const productsMessage = `🛍️ Our Available Products

📋 Product List:
• BANK LOGS
• CC & CVV
• CLONE CARD
• TRANSFERS
• LINKABLES
• AND MORE

💡 Click the button below to browse and purchase our products.`;

      await ctx.reply(productsMessage, productsKeyboard);
    } catch (error) {
      console.error('Error in products command:', error);
      await ctx.reply('❌ Sorry, something went wrong. Please try again later.');
    }
  }

  // Handle any text message
  @Hears(/.*/)
  async onText(@Ctx() ctx: Context) {
    try {
      const helpUrl = process.env.HELP_URL || '';
      
      const helpKeyboard = Markup.inlineKeyboard([
        [Markup.button.url('📞 Contact Support', helpUrl)],
      ]);

      await ctx.reply(
        '💬 For any questions or support, please click the button below to contact our admin team.',
        helpKeyboard
      );
    } catch (error) {
      console.error('Error in text handler:', error);
    }
  }

}
