import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';


@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Post()
    async createUpdatePlayer(
        @Body() playerDto: CreatePlayerDTO,
    ) {
        await this.playersService.createUpdatePlayer(playerDto);
    }


    @Get()
    async getPlayers(
        @Query('email') email: string
    ): Promise<Player[] | Player> {

        if (email) {
            return await this.playersService.getPlayerByEmail(email);
        }

        return await this.playersService.getAllPlayers();
    }
}
