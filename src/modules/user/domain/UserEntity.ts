export class UserEntity {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly hashedPassword: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    private constructor(id: string, email: string, name: string, hashedPassword: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.hashedPassword = hashedPassword;
    }

    static create(id: string, email: string, name: string, hashedPassword: string): UserEntity {
        return new UserEntity(id, email, name, hashedPassword);
    }

    static fromDatabase(
        id: string,
        email: string,
        name: string,
        hashedPassword: string,
        createdAt?: Date,
        updatedAt?: Date,
    ): UserEntity {
        const user = new UserEntity(id, email, name, hashedPassword);
        user.setTimestamps(createdAt, updatedAt);
        return user;
    }

    private setTimestamps(createdAt?: Date, updatedAt?: Date): void {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getCreationDate(): Date | undefined {
        return this.createdAt;
    }

    getUpdateDate(): Date | undefined {
        return this.updatedAt;
    }
}
