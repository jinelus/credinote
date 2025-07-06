type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function withErrorHandling<T>(fn: () => Promise<ActionResponse<T>>): Promise<ActionResponse<T>> {
  try {
    const response = await fn();
    
    if (!response.success) {
      return { success: false, error: response.error }
    }
    
    return { success: true, data: response.data }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('[Server Error]', err)

    if (err.code === 'P2002') {
      return { success: false, error: 'Ressource déjà existante (conflit).' };
    }

    if (err.code === 'P2025') {
      return { success: false, error: 'Ressource introuvable.' };
    }

    return { success: false, error: 'Erreur serveur inattendue.' };
  }
}
