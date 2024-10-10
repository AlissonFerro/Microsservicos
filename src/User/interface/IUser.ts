export default interface IUser{
    name: string,
    phone: string,
    password?: string,
    createdAt?: number,
    updatedAt?: number | undefined | null,
    deletedAt?: number | undefined | null
}