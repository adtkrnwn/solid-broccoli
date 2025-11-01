describe('Quiz 3', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC_LOGIN_001 - Login valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC_LOGIN_002 - Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('hannipham');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC_LOGIN_003 - Login dengan username salah', () => {
    cy.get('input[name="username"]').type('kimjiwon');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC_LOGIN_004 - Login username dan password kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  it('TC_LOGIN_005 - Login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  it('TC_LOGIN_006 - Login dengan username uppercase', () => {
    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC_FORGOT_001 - Verifikasi link Forgot Password', () => {
    cy.contains('Forgot your password?').should('be.visible').click();
    cy.url().should('include', '/requestPasswordResetCode');
    cy.contains('Reset Password').should('be.visible');
  });

  it('TC_LINK_001 - Verifikasi hyperlink OrangeHRM', () => {
    cy.contains('OrangeHRM, Inc').should('have.attr', 'href')
      .and('include', 'orangehrm.com');
  });

  it('TC_SOCIAL_001 - Verifikasi LinkedIn icon', () => {
    cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]').should('be.visible');
  });

  it('TC_SOCIAL_002 - Verifikasi Facebook icon', () => {
    cy.get('a[href="https://www.facebook.com/OrangeHRM/"]').should('be.visible');
  });

  it('TC_SOCIAL_003 - Verifikasi Twitter/X icon', () => {
    cy.get('a[href="https://twitter.com/orangehrm?lang=en"]').should('be.visible');
  });

  it('TC_SOCIAL_004 - Verifikasi YouTube icon', () => {
    cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]').should('be.visible');
  });

});