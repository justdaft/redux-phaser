let newArray = Array.apply(null, Array(36)).map(function (_, i) {return i + 1; });
newArray; // array [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 26 more… ]


    getTileProperties = () => {

        let x = this.tileLayer.getTileX(this.game.input.activePointer.worldX);
        let y = this.tileLayer.getTileY(this.game.input.activePointer.worldY);

        let tile: Phaser.Tile = this.map.getTile(x, y, this.tileLayer);
        console.log(tile.properties);
        tile.properties.alpha = 0.5;

    };
    
    expCreateGrid = () => {
        this.currentTiles.map((_: any, i: any) => {
            let id = _.tileImageId;
            let x = _.x - 1;
            let y = _.y - 1;
            this.map.putTile(id, x, y);
        });
        for (let col = 0; col < 6; col++) {
            for (let row = 0; row < 6; row++) {
                let cover = this.game.add.tileSprite(col, row, 100, 100, 'cover');
                cover.alpha = 0.9;
                // this.map.putTile(35, col, row);
            }
        }
    };

        let grid = [
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6]
        ];
        let gridGroup = this.game.add.group();

        function generateGrid(_grid: any, size: any) {
            let _size = size || 100;
            let col: any;
            let row: any;
            for (row = 0; row < _grid.length; row++) {
                for (col = 0; col < _grid[row].length; col++) {
                    gridGroup.create(row * size, col * _size, 'cover', _grid[row][col]);
                }
            }
        };

        generateGrid(grid, 100);
        console.log(gridGroup);
        let spr = gridGroup.children[1].visible = false;
        console.log(spr);
        
        