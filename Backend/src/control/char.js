import { pool } from '../database.js';

const addChar = async (request, response) => {
    const connection = await pool.getConnection();

    try {
        const { name, element, weapon, emotions, hobbies, lore } = request.body;

        if (!name || !element || !weapon || !emotions || !hobbies || !lore) {
            return response.status(400).json({
                success: false,
                message: "Campos obrigatórios não foram preenchidos"
            });
        }

        await connection.beginTransaction();

        // Teste se os valores de element e weapon existem no banco
        const [idVision] = await connection.query(
            `SELECT idVision FROM Vision WHERE visionName = ?;`,
            [element]
        );

        const [idWeapon] = await connection.query(
            `SELECT idWeapon FROM Weapon WHERE weaponName = ?;`,
            [weapon]
        );

        // if (idVision.length === 0 || idWeapon.length === 0) {
        //     console.log("Vision ou Weapon não encontrados no banco!");
        //     return response.status(400).json({
        //         success: false,
        //         message: "Vision ou Weapon inválidos"
        //     });
        // }

        const [added] = await connection.query(
            `INSERT INTO Player 
            (name, visionRef, weaponRef, lore) 
            VALUES (?, ?, ?, ?);`,
            [name, idVision[0].idVision, idWeapon[0].idWeapon, lore]
        );

        if (!added.insertId) {
            console.log("Erro ao inserir personagem.");
            return response.status(500).json({
                success: false,
                message: "Erro ao inserir personagem"
            });
        }

        for (let i = 0; i < emotions.length; i++) {
            await connection.query(
                `INSERT INTO player_emotion (idPlayer, idEmotion) VALUES (?, ?)`,
                [added.insertId, emotions[i]]
            );
        }

        for (let i = 0; i < hobbies.length; i++) {
            await connection.query(
                `INSERT INTO player_hobbies (idPlayer, idHobby) VALUES (?, ?)`,
                [added.insertId, hobbies[i]]
            );
        }

        await connection.commit();

        response.status(201).json({
            success: true,
            message: "Personagem cadastrado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao adicionar personagem:", error);
        await connection.rollback(); // Reverte a transação em caso de erro
        return response.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });
    } finally {
        connection.release();
    }
};

export { addChar };