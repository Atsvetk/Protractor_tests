require('../pages/game_page.js')
require('../pages/main_page.js')

var create_new_game_page = function() {
    
    this.getTitleText = function() {
        return element(by.tagName('h1')).getText()
    };
    
    this.getUsernameField = function() {
        return element(by.model('fp.user.fullname'))
    };
    
    this.enterUsername = function(value) {
        element(by.model('fp.user.fullname')).sendKeys(value)
    };
    
    this.enterGamename = function(value) {
        element(by.model('newGame.name')).sendKeys(value)
    };
    
    this.enterGameDesc = function(value) {
        element(by.model('newGame.description')).sendKeys(value)
    };
    
    this.enterStories = function(value) {
        element(by.model('newGame.stories')).sendKeys(value)
    };
    
    this.isBtnClickable = function() {
        return element(by.className('btn btn-success')).isEnabled()
    };
    
    this.clickCreateGameButton = function() {
        element(by.className('btn btn-success')).click();
        return require('../pages/game_page.js')
    };
    
    this.clickCancel = function() {
        element(by.linkText('Cancel')).click();
        return require('../pages/main_page.js')
    };
        
};

module.exports = new create_new_game_page()