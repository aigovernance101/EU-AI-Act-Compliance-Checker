
/**
 * Generates a SHA-256 hash for a given JSON object.
 * @param data The JSON object to hash.
 * @returns A promise that resolves to the hex-encoded SHA-256 hash.
 */
export const generateSha256 = async (data: object): Promise<string> => {
  try {
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(jsonString);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error("Hashing failed:", error);
    // Fallback for environments where crypto might not be available
    return "hashing_failed_see_console_for_details";
  }
};
