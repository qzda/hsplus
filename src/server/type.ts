export interface ServerConfig {
  path: string;
  port: number;
  /** Whether to enable LAN access */
  enableLan?: boolean;
}
