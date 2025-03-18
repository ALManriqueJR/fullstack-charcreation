CREATE TABLE Vision (
  idVision INT PRIMARY KEY,
  visionName VARCHAR(255) NOT NULL
);

CREATE TABLE Weapon (
  idWeapon INT PRIMARY KEY,
  weaponName VARCHAR(255) NOT NULL
);

CREATE TABLE Emotion (
  idEmotion INT PRIMARY KEY AUTO_INCREMENT,
  emotionName VARCHAR(255) NOT NULL
);

CREATE TABLE Hobby (
  idHobby INT PRIMARY KEY AUTO_INCREMENT,
  hobbyName VARCHAR(255) NOT NULL
);

CREATE TABLE Player (
  idPlayer INT AUTO_INCREMENT PRIMARY KEY,
  visionRef INT NOT NULL,
  weaponRef INT NOT NULL,  -- Removida UNIQUE para permitir que várias pessoas tenham a mesma arma
  lore TEXT,
  FOREIGN KEY (visionRef) REFERENCES Vision(idVision),
  FOREIGN KEY (weaponRef) REFERENCES Weapon(idWeapon)
);

CREATE TABLE Player_Emotion (
  idPlayer INT,
  idEmotion INT,
  PRIMARY KEY (idPlayer, idEmotion),
  FOREIGN KEY (idPlayer) REFERENCES Player(idPlayer) ON DELETE CASCADE,
  FOREIGN KEY (idEmotion) REFERENCES Emotion(idEmotion) ON DELETE CASCADE
);

CREATE TABLE Player_Hobbies (
  idPlayer INT,
  idHobby INT,  -- Corrigido para "idHobby" (sem "s")
  PRIMARY KEY (idPlayer, idHobby),
  FOREIGN KEY (idPlayer) REFERENCES Player(idPlayer) ON DELETE CASCADE,
  FOREIGN KEY (idHobby) REFERENCES Hobby(idHobby) ON DELETE CASCADE
);
