import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PlayersService {

    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name)

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        const { email } = createPlayerDTO;

        const foundPlayer = await this.players.find(pl => pl.email === email);

        if (foundPlayer) {
            return await this.update(foundPlayer, createPlayerDTO);
        }

        await this.create(createPlayerDTO);
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const foundPlayer = await this.players.find(pl => pl.email === email);

        if (!foundPlayer) throw new NotFoundException(`Player with email ${email}, not found`)

        return foundPlayer;
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

    private update(foundPlayer: Player, createPlayerDTO: CreatePlayerDTO): void {
        const { name, phoneNumber } = createPlayerDTO;

        foundPlayer.name = name;
    }
}
