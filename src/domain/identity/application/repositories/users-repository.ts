import { Student } from '@notebook/enterprise/entities/student'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
