import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';


@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Post()
    async createUpdatePlayer(
        @Body() playerDto: CreatePlayerDTO,
    ) {
        await this.playersService.createUpdatePlayer(playerDto);
    }
}
