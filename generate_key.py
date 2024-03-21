from bitcoinlib.wallets import Wallet, wallet_delete_if_exists


def generate_address(wallet_type):
  """Generates a Bitcoin testnet address based on the specified wallet type.

  Args:
      wallet_type (str): The type of address to generate (p2pk, p2pkh, p2sh, p2wpkh, or p2wsh).

  Returns:
      str: The generated Bitcoin testnet address.

  Raises:
      ValueError: If an unsupported wallet type is provided.
  """
  # Pre-define witness types for clarity
  witness_types = {
      'p2sh': 'p2sh-segwit',
      'p2wpkh': 'segwit',
      'p2pkh': 'segwit',
      'p2wsh': 'segwit',
  }

  # Validate wallet type
  if wallet_type not in witness_types:
      raise ValueError(f"Unsupported wallet type: {wallet_type}")
  if wallet_delete_if_exists(wallet_type): pass
  # Create wallet based on type and witness type
  wallet = Wallet.create(
      wallet_type,
      keys='cRvnnrZSXHn9cMXuBEomvWDMzayQxkmDM1zEYqe3QL5i5UCdGuyK',  # Replace with your actual private key
      witness_type=witness_types[wallet_type],
      network='testnet'
  )

  # Get address from the wallet
  address = wallet.get_key().address
  return address

# Generate and print addresses
print("P2PKH:", generate_address("p2pkh"))
print("P2SH:", generate_address("p2sh"))
print("P2WPKH:", generate_address("p2wpkh"))
print("P2WSH:", generate_address("p2wsh"))

# P2TR (Taproot) is not currently supported by bitcoinlib (as of v0.12.2)
print("P2TR:", "Not supported by current library version")