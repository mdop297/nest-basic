- nest new .
- nest g module users
- nest g service users
- nest g controller users
  <=====>
- install @nestjs/typeorm typeorm sqlite3
  <=====>
  ![alt text](<../asset/8-3 create entity and repository.png>)
- [Repository pattern in nestjs](https://docs.nestjs.com/techniques/database#repository-pattern)
- routes design

### setup body validation

- ![Create routes](<../asset/8-8 route design.png>)
- follow [this](https://docs.nestjs.com/techniques/validation#auto-validation)
- target: route `/auth/signup`
  - root controller: change /users to /auth in user controller
  - main: add validationPipe in main
  - dto: create dto object
  - controller: update route in controller
  - service: update service (service use repository to interact with database => create repository in service using constructor)
    - use this instead of follow documentation.
    ```typescript
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    ```
  - controller: use service which has just been created.(remember to use constructor for that service )

# Questions

- why do we need to create User entity before saving data to database?

  ```typescript
  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create User entity instance, not saved to database yet.

    //return this.repo.save({email, password}) // why don't we use this instead?
    return this.repo.save(user); // save instance to database.
  }
  ```

  => because:

  - we can use `hook` after executing specific action (create, update, remove)
