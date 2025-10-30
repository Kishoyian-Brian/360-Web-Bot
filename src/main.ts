import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Telegram } from 'telegraf';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  // Set webhook automatically when app starts
  const botToken = process.env.BOT_TOKEN;
  const webhookUrl = process.env.WEBHOOK_URL;

  if (botToken && webhookUrl) {
    const telegram = new Telegram(botToken);
    try {
      await telegram.setWebhook(webhookUrl);
      console.log(`✅ Webhook set to: ${webhookUrl}`);
    } catch (error) {
      console.error('❌ Failed to set webhook:', error);
    }
  }
}
bootstrap();
