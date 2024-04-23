// game.js
document.addEventListener("DOMContentLoaded", () => {

    // Create the Babylon.js engine and set up the canvas
    const canvas = document.getElementById("gameCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    // Create the initial scene for character creation
    const initialScene = new BABYLON.Scene(engine);

    // Constants for movement
    const MOVEMENT_SPEED = 0.1; // Speed of character movement

    // Set up a basic camera for the initial scene (character creation)
    const initialCamera = new BABYLON.ArcRotateCamera(
        "initialCamera",
        0,
        Math.PI / 2,
        10,
        new BABYLON.Vector3(0, 0, 0),
        initialScene
    );

    initialCamera.attachControl(canvas, true);

    // Add basic lighting to the initial scene
    const initialLight = new BABYLON.HemisphericLight(
        "initialLight",
        new BABYLON.Vector3(1, 1, 0),
        initialScene
    );

    // Start rendering the initial scene
    engine.runRenderLoop(() => {
        initialScene.render();
    });

    // Resize handling
    window.addEventListener("resize", () => {
        engine.resize();
    });

    // Function to create a tree with a trunk and cone-shaped foliage
    function createTree(scene) {
        // Create a cylinder for the trunk
        const trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", { height: 2, diameter: 0.5 }, scene);
        trunk.position.y = 1; // Position to avoid half-buried trunk
        trunk.material = new BABYLON.StandardMaterial("trunkMaterial", scene);
        trunk.material.diffuseColor = new BABYLON.Color3(0.55, 0.27, 0.07); // Brown color for the trunk

        // Create a cone for the foliage
        const foliage = BABYLON.MeshBuilder.CreateCylinder("foliage", {
            height: 2,
            diameterBottom: 2,
            diameterTop: 0, // This creates the cone shape
        }, scene);
        foliage.position.y = 3; // Position above the trunk
        foliage.material = new BABYLON.StandardMaterial("foliageMaterial", scene);
        foliage.material.diffuseColor = new BABYLON.Color3(0, 1, 0); // Green color for the foliage

        // Combine trunk and foliage into a single tree object
        const tree = new BABYLON.TransformNode("tree");
        trunk.parent = tree;
        foliage.parent = tree;

        return tree;
    }

    // Function to add environmental objects to the scene
    function createEnvironmentalObjects(scene) {
        const tree = createTree(scene);

        // Position the tree in the scene
        tree.position.x = 10;
        tree.position.z = 10;

        return tree;
    }

    // Function to create the game environment with terrain and environmental objects
    function createGameEnvironment(scene) {
        // Create a large ground plane as the base of the landscape
        const ground = BABYLON.MeshBuilder.CreateGround(
            "ground",
            { width: 100, height: 100 },
            scene
        );

        // Set a basic material for the ground
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.5); // Greenish color
        ground.material = groundMaterial;

        // Add environmental objects to the scene
        createEnvironmentalObjects(scene);

        return ground;
    }

    function addLightingAndAtmosphere(scene) {
        // Add a second light source for better illumination
        const additionalLight = new BABYLON.HemisphericLight(
            "additionalLight",
            new BABYLON.Vector3(-1, -1, -1),
            scene
        );

        // Adjust ambient lighting for a warmer feel
        additionalLight.diffuse = new BABYLON.Color3(1, 1, 0.8); // Warmer light
        additionalLight.specular = new BABYLON.Color3(0, 0, 0); // No specular highlights

        return additionalLight;
    }

    // Function to create the main game scene with the customized character
    const createGameScene = (gender, skinColor) => {
        const gameScene = new BABYLON.Scene(engine);

        // Create a new camera for the main game
        const gameCamera = new BABYLON.FreeCamera(
            "gameCamera",
            new BABYLON.Vector3(0, 1, -10),
            gameScene
        );

        gameCamera.setTarget(new BABYLON.Vector3(0, 1, 0));
        gameCamera.attachControl(canvas, true);

        // Add basic lighting to the game scene
        const gameLight = new BABYLON.HemisphericLight(
            "gameLight",
            new BABYLON.Vector3(1, 1, 0),
            gameScene
        );

        // Create the game environment
        createGameEnvironment(gameScene);

        // Add additional lighting and atmosphere
        addLightingAndAtmosphere(gameScene);

        // Load the 3D environment from an .obj file
        loadEnvironment(gameScene, 'Low_Poly_Forest.obj', (meshes) => {
            console.log('Environment loaded:', meshes)
        });

        // Create the customized character
        const character = createCharacter(gameScene, gender, skinColor);
        console.log('Character created:', character);
        return gameScene;
    };

    // Define the logic to start the game with the customized character
    const startGame = (gender, skinColor) => {
        // Create the game scene and transition to it
        const gameScene = createGameScene(gender, skinColor);

        // Update the render loop to render the game scene
        engine.runRenderLoop(() => {
            gameScene.render();
        });
    };

    // Initialize character creation with the startGame callback
    initCharacterCreation(initialScene, startGame);

});

// Function to create a customizable character
function createCharacter(scene, gender, skinColor) {
    // Clear previous character models from the scene
    scene.meshes
        .filter((mesh) => mesh.name === 'character')
        .forEach((mesh) => mesh.dispose());

    // Load the appropriate character model based on gender
    const characterPath = gender === "male" ? "./assets/male.glb" : "./assets/female.glb";

    BABYLON.SceneLoader.ImportMesh("", characterPath, "", scene, (meshes) => {
        const character = meshes[0];
        character.name = 'character';

        // Update the skin color of the character
        if (character.material) {
            character.material.albedoColor = BABYLON.Color3.FromHexString(skinColor);
        } else {
            // If there's no material, apply a basic material with the selected skin color
            const material = new BABYLON.StandardMaterial('characterMaterial', scene);
            material.diffuseColor = BABYLON.Color3.FromHexString(skinColor);
            character.material = material;
        }
    });
}

// Function to initialize character creation with real-time updates
function initCharacterCreation(scene, onStartGame) {
    const genderInputs = document.getElementsByName('gender');
    const skinColorInput = document.getElementById('skinColor');
    const startGameButton = document.getElementById('startGame');

    let gender = 'male';
    let skinColor = '#ffe0bd'; // Default skin color

    // Function to create or update the character based on user input
    const updateCharacter = () => {
        createCharacter(scene, gender, skinColor);
    };

    // Update character when gender changes
    genderInputs.forEach((input) => {
        input.addEventListener('change', () => {
            gender = input.value;
            updateCharacter();
        });
    });

    // Update character when skin color changes
    skinColorInput.addEventListener('change', () => {
        skinColor = skinColorInput.value;
        updateCharacter();
    });

    // Create initial character
    updateCharacter();

    // Start the game with the customized character
    startGameButton.addEventListener('click', () => {
        // Hide character creation UI and trigger game start
        document.getElementById('characterCreation').style.display = 'none';

        if (onStartGame) {
            onStartGame(gender, skinColor);
        }
    });
}

// Function to load a 3D environment from an .obj file
function loadEnvironment(scene, objPath, onLoaded) {
    // The .obj file may require a companion .mtl (material) file
    const assetFolderPath = './assets/environment/';

    // Import the OBJ mesh into the scene
    BABYLON.SceneLoader.ImportMesh(
        "",
        assetFolderPath,
        objPath,
        scene,
        (meshes) => {
            // Position the imported environment (if needed)
            meshes.forEach((mesh) => {
                mesh.position = new BABYLON.Vector3(0, 0, 0); // Adjust position as needed
                mesh.scaling = new BABYLON.Vector3(2, 2, 2); // Adjust scale as needed
            });

            // Optional: Call a callback function once the environment is loaded
            if (onLoaded) {
                onLoaded(meshes);
            }
        },
        (progress) => {
            // Handle loading progress (optional)
            console.log("Loading progress:", progress);
        },
        (scene, message, exception) => {
            // Handle loading errors (optional)
            console.error("Error loading .obj file:", message, exception);
        }
    );
}
