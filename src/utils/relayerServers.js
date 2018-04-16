import { HttpClient } from '@0xproject/connect'
import { RELAY_SERVERS } from '../constants/config'

export const relayerServers = RELAY_SERVERS.map(relayServer => ({
  httpClient: new HttpClient(relayServer.url), // 0x Standard Relayer API
  source: relayServer
}))
export default relayerServers

export const getRelayerServerByName = (name) => (
  [
    ...relayerServers.filter(item => item.source.name === name),
    {}
  ][0]
)
