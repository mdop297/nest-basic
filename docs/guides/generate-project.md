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
- ![Create routes](<../asset/8-8 route design.png>)

### setup body validation

- follow [this](https://docs.nestjs.com/techniques/validation#auto-validation)
- target: route `/auth/signup`
  - change /users to /auth in user controller
  - add validationPipe in main
  - create dto object
  - update route in controller
