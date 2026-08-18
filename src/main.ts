import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'
import * as bodyParser from 'body-parser';

dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })
	  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

	await app.listen(process.env.PORT ?? 4200)
}
bootstrap()
