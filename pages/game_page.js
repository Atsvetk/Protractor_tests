var game_page = function() {
    
    this.gotoStoryListTab = function() {
        element(by.linkText('Story list')).click()
    };
    
        
    this.isStoryPresent = function(story) {
        return element(by.linkText(story)).isPresent()
    };
    
    this.clickStory = function(story) {
        element(by.linkText('Story list')).click();
        element(by.linkText(story)).click()        
    };
    
    this.deleteStory = function() {
        element.all(by.css('.pull-right')).first().element(by.tagName('a')).click();
    };

    // next method just doesn't work properly
    this.matchCardsValues = function(values) {
        var l = values.length;
        var match = true
        for (var i = 0; i < l; i++) {
            if (element(by.linkText(values[i])).isPresent()==false) {
                match = false;
                //console.log('link!');
                //console.log(values[i]);
                break;
            };
        };
        if (element.all(by.css('.list-inline li')).count() != l) {
            match = false;
            //console.log('count!');
            //var count = element.all(by.css('.list-inline li')).count();
            //console.log(l, count);
        };
        return match
    };
    
    this.hasButton = function(btn_name) {
        return element(by.buttonText(btn_name)).isPresent()
    };
    
    this.isBtnActive = function(btn_name) {
        return element(by.buttonText(btn_name)).isEnabled()
    };
    
    this.clickButton = function(btn_name) {
        return element(by.buttonText(btn_name)).click()
    };
    
};

module.exports = new game_page()