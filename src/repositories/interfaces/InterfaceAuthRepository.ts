
export default interface InterfaceAuthRepository {
    login(email: string, password: string): Promise<string>
}