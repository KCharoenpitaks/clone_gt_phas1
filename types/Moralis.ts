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
