import { DataSource } from 'typeorm'

export const appDataSource = new DataSource({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'tagged_image_service',
    password: 'password123',
    database: 'tagged_image_service_db',
    entities: [__dirname + '/entity/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migration/*{.ts,.js}'],
    logging: false,
    synchronize: false,
    timezone: 'Z',
})

let connection: DataSource

export async function getConnection() {
    if (!connection) {
        connection = await appDataSource.initialize()
    }

    return connection
}
