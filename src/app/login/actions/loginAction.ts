import { PrismaUserRepository } from '@/modules/user/infrastructure/PrismaUserRepository';
import { FindUserByEmailUseCase } from '@/modules/user/application/use-cases/FindUserByEmailUseCase';
import { ValidateUserUseCase } from '@/modules/user/application/use-cases/ValidateUserUseCase';

export async function loginAction(email: string, password: string): Promise<{
    success: boolean;
    user?: { id: string; email: string; name: string };
}> {
    const userRepository = new PrismaUserRepository();
    const findUserByEmail = new FindUserByEmailUseCase(userRepository);
    const validateUser = new ValidateUserUseCase(findUserByEmail);

    const isValid = await validateUser.execute(email, password);

    if (!isValid) {
        throw new Error('Invalid credentials');
    }

    const user = await findUserByEmail.execute(email);

    if (!user) {
        throw new Error('User not found');
    }

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
}
