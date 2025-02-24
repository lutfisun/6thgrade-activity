document.addEventListener("DOMContentLoaded", function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false,
            },
        },
    };

    let player;
    let enemies;
    let cursors;
    let game = new Phaser.Game(config);

    function preload() {
        this.load.image("player", "assets/sprites/player.png");
        this.load.image("enemy", "assets/sprites/enemy.png");
    }

    function create() {
        player = this.physics.add.sprite(100, 300, "player").setScale(0.5);
        player.setCollideWorldBounds(true);

        enemies = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            let enemy = enemies.create(
                Phaser.Math.Between(200, 750),
                Phaser.Math.Between(100, 500),
                "enemy"
            ).setScale(0.5);
            enemy.setVelocityX(Phaser.Math.Between(-100, 100));
            enemy.setVelocityY(Phaser.Math.Between(-100, 100));
            enemy.setCollideWorldBounds(true);
            enemy.setBounce(1);
        }

        this.physics.add.collider(player, enemies, gameOver, null, this);
        cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
        player.setVelocity(0);
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
        }
        if (cursors.up.isDown) {
            player.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            player.setVelocityY(200);
        }
    }

    function gameOver() {
        alert("Game Over!");
        location.reload();
    }
});
