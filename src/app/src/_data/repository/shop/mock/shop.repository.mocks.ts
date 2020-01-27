import {
  CategoryEntity,
  LineItem,
  OrderEntity,
  PAYMENT_METHOD,
  ProductCategory,
  ProductEntity,
  ProductImage,
  Shipping
} from '../../../../_core';

export class ShopRepositoryMocks {
  public static Order(): OrderEntity {
    const result = new OrderEntity({
      paymentMethod: PAYMENT_METHOD.BACS,
      paymentMethodTitle: 'Direct Bank Transfer',
      setPaid: false,
      shipping: new Shipping({
        fistName: 'Real',
        lastName: 'Doe',
        address1: '969 Market',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US'
      }),
      lineItems: [
        new LineItem({
          productId: 93,
          quantity: 1
        })
      ]
    });
    return result;
  }

  public static Products(): Array<ProductEntity> {
    const result = [
      new ProductEntity({
        id: 1,
        name: 'Product 1',
        slug: 'product-1',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      }),
      new ProductEntity({
        id: 2,
        name: 'Product 2',
        slug: 'product-2',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      }),
      new ProductEntity({
        id: 3,
        name: 'Product 3',
        slug: 'product-3',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      }),
      new ProductEntity({
        id: 4,
        name: 'Product 4',
        slug: 'product-4',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      }),
      new ProductEntity({
        id: 5,
        name: 'Product 5',
        slug: 'product-5',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      }),
      new ProductEntity({
        id: 6,
        name: 'Product 6',
        slug: 'product-6',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      }),
      new ProductEntity({
        id: 7,
        name: 'Product 7',
        slug: 'product-7',
        price: 100,
        categories: [
          new ProductCategory({
            id: 1,
            name: 'category-1'
          })
        ],
        images: [
          new ProductImage({
            id: 1,
            src: 'https://placeholder.pics/svg/200/f8f9fa/000000-f8f9fa/product'
          })
        ]
      })
    ];
    return  result;
  }

  public static Categories(): Array<CategoryEntity> {
    const result = [
      new CategoryEntity({id: 1, name: 'category 1', slug: 'slug-1', description: 'desc desc desc', count: 2}),
      new CategoryEntity({id: 2, name: 'category 2', slug: 'slug-2', description: 'desc desc desc', count: 3}),
      new CategoryEntity({id: 3, name: 'category 3', slug: 'slug-3', description: 'desc desc desc', count: 3}),
      new CategoryEntity({id: 3, name: 'category 4', slug: 'slug-4', description: 'desc desc desc', count: 0}),
      new CategoryEntity({id: 3, name: 'category 4', slug: 'slug-5', description: 'desc desc desc', count: 1}),
      new CategoryEntity({id: 3, name: 'category 6', slug: 'slug-6', description: 'desc desc desc', count: 0})
    ];
    return  result;
  }
}
