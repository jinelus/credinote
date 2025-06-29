type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function withErrorHandling<T>(fn: () => Promise<T>): Promise<ActionResponse<T>> {
  try {
    const data = await fn();
    return { success: true, data }
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
