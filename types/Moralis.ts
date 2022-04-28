export interface GetAllTokenIdsRaw {
  token_hash: string;
  block_number_minted: string;
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}

export interface GetAllTokenIdsTransformed {
  token_hash: string;
  block_number_minted: string;
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  metadata?: Record<string, any> | null;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
  creator?: string;
}

export interface GetTokenIdOwnersRaw {
  token_address: string;
  token_id: string;
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  token_hash: string;
  amount: string;
  contract_type: string;
  name?: string | null;
  symbol?: string | null;
  token_uri: string;
  metadata: string;
  synced_at: string;
}
export interface GetTokenIdOwnersTransformed {
  token_address: string;
  token_id: string;
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  token_hash: string;
  amount: string;
  contract_type: string;
  name?: string | null;
  symbol?: string | null;
  token_uri: string;
  metadata?: Record<string, any> | null;
  synced_at: string;
}

export interface GetTokenIdMetadataRaw {
  token_address: string;
  token_id: string;
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  amount: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  synced_at: string;
  is_valid: number;
  syncing: number;
  frozen: number;
}
export interface GetTokenIdMetadataTransformed {
  token_address: string;
  token_id: string;
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  amount: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata?: Record<string, any> | null;
  synced_at: string;
  is_valid: number;
  syncing: number;
  frozen: number;
}
