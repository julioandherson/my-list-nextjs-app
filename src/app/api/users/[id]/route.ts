import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser } from '@/data';
import { UserUpdateData } from '@/types';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/users/[id]
 * Retorna os dados de um usuário específico
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    const user = getUserById(id);

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                error: 'Usuário não encontrado',
            },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data: user,
    });
}

/**
 * PATCH /api/users/[id]
 * Atualiza os dados de um usuário
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    try {
        const body: UserUpdateData = await request.json();

        // Validar campos permitidos
        const allowedFields: (keyof UserUpdateData)[] = ['name', 'avatarUrl', 'myList'];
        const invalidFields = Object.keys(body).filter(
            (key) => !allowedFields.includes(key as keyof UserUpdateData)
        );

        if (invalidFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Campos não permitidos: ${invalidFields.join(', ')}`,
                },
                { status: 400 }
            );
        }

        const updatedUser = updateUser(id, body);

        if (!updatedUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Usuário não encontrado',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao processar requisição',
            },
            { status: 400 }
        );
    }
}
