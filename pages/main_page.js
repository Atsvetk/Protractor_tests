require('../pages/create_new_game_page.js')

var main_page = function() {
    
    this.clickPlayNowButton = function() {
        element(by.css('.btn')).click();
        return require('../pages/create_new_game_page.js')
    };
    
    this.isPicturePresent = function() {
        return element(by.tagName('img')).isPresent()
    };
    
    this.getTitleText = function() {
        return element(by.css('.logo')).getText()
    };
    
    this.getButtonText = function() {
        return element(by.css('.btn')).getText()
    };
    
    this.isTwitterButtonPresent = function() {
        return element(by.id('twitter-widget-0')).isPresent()
    };
    
    this.isGooglePlusButtonPresent = function() {
        return element(by.id('___plusone_0')).isPresent()
    };
       
};

module.exports = new main_page()