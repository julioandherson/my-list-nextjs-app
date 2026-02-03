import { NextResponse } from 'next/server';
import { items } from '@/data';

/**
 * GET /api/items
 * Retorna a lista de todos os itens
 */
export async function GET() {
    return NextResponse.json({
        success: true,
        data: items,
        total: items.length,
    });
}
