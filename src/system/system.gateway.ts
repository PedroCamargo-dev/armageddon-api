import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { SystemService } from './system.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SystemGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly systemService: SystemService) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    console.log('SystemGateway Disconnect', client.id);
  }

  handleConnection(client: any) {
    console.log('SystemGateway Connection', client.id);
  }

  @SubscribeMessage('osInfo')
  async getOsInfo() {
    this.server.emit('osInfo', await this.systemService.getOsInfo());
  }

  @SubscribeMessage('CPU')
  async getCPU() {
    setInterval(async () => {
      this.server.emit('CPU', await this.systemService.getCPU());
    }, 5000);
  }

  @SubscribeMessage('Network')
  async getNetwork() {
    this.server.emit('Network', await this.systemService.getNetwork());
  }

  @SubscribeMessage('NetworkStats')
  async getNetworkStats() {
    setInterval(async () => {
      this.server.emit(
        'NetworkStats',
        await this.systemService.getNetworkStats(),
      );
    }, 1000);
  }

  @SubscribeMessage('Memory')
  async getMemory() {
    setInterval(async () => {
      this.server.emit('Memory', await this.systemService.getMemory());
    }, 1000);
  }

  @SubscribeMessage('FsSize')
  async getFsSize() {
    this.server.emit('getFsSize', await this.systemService.getFsSize());
  }
}
