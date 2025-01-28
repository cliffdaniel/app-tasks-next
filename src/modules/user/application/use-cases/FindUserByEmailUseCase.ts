import { UserRepository } from '@/modules/user/domain/UserRepository';
import { UserEntity } from '@/modules/user/domain/UserEntity';

export class FindUserByEmailUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findByEmail(email);
    }
}
