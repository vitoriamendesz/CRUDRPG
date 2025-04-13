import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemMagico, ItemMagicoSchema } from './entities/item-magico.entity';
import { ItemMagicoService } from './item-magico.service';
import { ItemMagicoController } from './item-magico.controller';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: ItemMagico.name, schema: ItemMagicoSchema }
      ])
    ],
    controllers: [ItemMagicoController],
    providers: [ItemMagicoService],
    exports: [
      ItemMagicoService,
      MongooseModule 
    ]
  })
  export class ItemMagicoModule {}