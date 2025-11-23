describe('Movie Ticketing flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movies?page=0&size=6', { fixture: 'movies-page.json' }).as('getMovies');
    cy.intercept('POST', '**/cart', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Cart item added',
        data: {
          id: 1,
          quantity: 1,
          purchased: false,
          purchaseDate: null,
          movieId: 1,
          movieName: 'Storm Front',
          ticketPrice: 18
        }
      }
    }).as('postCart');
    cy.intercept('POST', '**/checkout', { fixture: 'checkout-response.json' }).as('checkout');
    cy.intercept('GET', '**/accounts/1/cart', { fixture: 'cart-items.json' }).as('getCart');
    cy.intercept('POST', '**/movies', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Movie saved',
        data: {
          id: 99,
          name: 'Daybreak',
          description: 'Morning vigil',
          publicationYear: 2025,
          director: 'Ali Khan',
          actor: 'Atif Aslam',
          genre: 'Drama',
          coverPhoto: null,
          ticketPrice: 15,
          typeId: 2,
          typeName: 'Drama',
          ownerId: 1,
          ownerUsername: 'meera'
        }
      }
    }).as('postMovie');
    cy.intercept('GET', '**/movies/1', { fixture: 'movie-detail.json' }).as('getMovieDetail');
    cy.intercept('GET', '**/movies/1/ratings', { fixture: 'ratings.json' }).as('getRatings');
  });

  it('creates a movie, adds it to cart, and checks out', () => {
    cy.visit('/');
    cy.wait('@getMovies');
    cy.get('app-movie-card').first().contains('Add to Cart').click();
    cy.wait('@postCart');
    cy.get('.app-message').should('contain', 'Added to cart');

    cy.visit('/admin/movies');
    cy.wait('@getMovies');
    cy.get('[formcontrolname="name"]').type('Daybreak');
    cy.get('[formcontrolname="genre"]').type('Drama');
    cy.get('[formcontrolname="description"]').type('Morning vigil');
    cy.get('[formcontrolname="director"]').type('Ali Khan');
    cy.get('[formcontrolname="actor"]').type('Atif Aslam');
    cy.get('[formcontrolname="ticketPrice"]').clear().type('15');
    cy.get('button').contains('Create').click();
    cy.wait('@postMovie');
    cy.get('.app-message').should('contain', 'Movie created');

    cy.visit('/cart');
    cy.wait('@getCart');
    cy.get('button').contains('Complete checkout').click();
    cy.wait('@checkout');
    cy.get('.app-message').should('contain', 'Checkout completed');
  });
});
