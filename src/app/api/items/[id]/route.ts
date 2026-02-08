import { NextRequest, NextResponse } from 'next/server';
import { getItemById } from '@/data';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/items/[id]
 * Retorna os detalhes de um item específico
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    const item = getItemById(id);

    if (!item) {
        return NextResponse.json(
            {
                success: false,
                error: 'Item não encontrado',
            },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data: item,
    });
}
