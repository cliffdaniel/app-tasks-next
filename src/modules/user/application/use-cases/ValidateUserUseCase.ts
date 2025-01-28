import bcrypt from 'bcryptjs';
import { FindUserByEmailUseCase } from './FindUserByEmailUseCase';

export class ValidateUserUseCase {
    private findUserByEmailUseCase: FindUserByEmailUseCase;

    constructor(findUserByEmailUseCase: FindUserByEmailUseCase) {
        this.findUserByEmailUseCase = findUserByEmailUseCase;
    }

    async execute(email: string, password: string): Promise<boolean> {
        const user = await this.findUserByEmailUseCase.execute(email);

        if (!user || !user.hashedPassword) return false;

        return await bcrypt.compare(password, user.hashedPassword);
    }
}
