import { faker } from "@faker-js/faker"
import { PrismaClient, Product } from "@prisma/client"
import * as dotenv from "dotenv"

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
  const products: Product[] = []

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName()
    const categoryName = faker.commerce.department()

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName).toLowerCase(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price({ min: 10, max: 999, dec: 0 }),
        images: {
          create: Array.from(
            { length: faker.number.int({ min: 1, max: 5 }) },
            () => ({
              imageUrl: faker.image.url({ width: 500, height: 500 })
            })
          )
        },
        category: {
          create: {
            name: categoryName,
            slug: faker.helpers.slugify(categoryName).toLowerCase()
          }
        },
        reviews: {
          create: [
            {
              rating: faker.number.int({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            },
            {
              rating: faker.number.int({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            }
          ]
        }
      }
    })

    products.push(product)
  }

  console.log(`Creating ${products.length} products ...`)
}

async function main() {
  console.log("Start seeding ...")
  await createProducts(10)
}

main()
  .catch(e => {
    console.error(e)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
