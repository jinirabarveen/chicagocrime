describe('the svg', function() {
    let svg = document.getElementsByTagName('svg');
    it('svg should be created', function() {
        expect(svg.length).to.equal(1);
    });

    it('svg have rectangles for bar chart', function() {
        expect(document.getElementsByTagName('line')).to.not.be.null; 
    });

    function getSvg() {
        return d3.select('svg');
    }

});