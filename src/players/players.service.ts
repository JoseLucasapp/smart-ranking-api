import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PlayersService {

    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name)

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        await this.create(createPlayerDTO);
    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const { name, email, phoneNumber } = createPlayerDTO;

        const player: Player = {
            _id: uuidv4(),
            name,
            email,
            phoneNumber,
            ranking: "A",
            positionRanking: 1,
            urlPhotoPlayer: ""
        }
        this.players.push(player);
        this.logger.log(`createPlayersDto: ${JSON.stringify(player)}`);

    }
}
