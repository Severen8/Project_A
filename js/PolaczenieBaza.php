<?php
header('Content-Type: application/json');

$servername = "your_server_name";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $params = json_decode(file_get_contents('php://input'), true) ?? [];
    $action = $params['action'] ?? null;

    if (!$action) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing action']);
        exit;
    }

    switch ($action) {
        case 'getCharactersByUser':
            $idGracza = $params['idGracza'] ?? null;

            if (!$idGracza) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing player ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, idGracza, idKampanii, nazwa, staty, opis FROM postać WHERE idGracza = :idGracza");
            $stmt->bindParam(':idGracza', $idGracza, PDO::PARAM_INT);
            $stmt->execute();
            $characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($characters) {
                echo json_encode($characters);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Characters not found']);
            }
            break;

        case 'getCharacter':
            $id = $params['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing character ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, idGracza, idKampanii, nazwa, staty, opis FROM postać WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $character = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($character) {
                echo json_encode($character);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Character not found']);
            }
            break;

        case 'getUser':
            $id = $params['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing user ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, nazwa, typ, email FROM uzytkownicy WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }
            break;

        case 'getCharacterByCampaign':
            $idKampanii = $params['idKampanii'] ?? null;

            if (!$idKampanii) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing campaign ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, idGracza, idKampanii, nazwa, staty, opis FROM postać WHERE idKampanii = :idKampanii");
            $stmt->bindParam(':idKampanii', $idKampanii, PDO::PARAM_INT);
            $stmt->execute();
            $characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($characters) {
                echo json_encode($characters);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Characters not found for this campaign']);
            }
            break;

        case 'getCampaign':
            $id = $params['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing campaign ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, idMG, nazwa, opis FROM kampania WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $campaign = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($campaign) {
                echo json_encode($campaign);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Campaign not found']);
            }
            break;

        case 'getChatMessages':
            $idUzytkownika = $params['idUzytkownika'] ?? null;

            if (!$idUzytkownika) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing user ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, idKampani, czas, idUzytkownika, tresc FROM chatwpis WHERE idUzytkownika = :idUzytkownika");
            $stmt->bindParam(':idUzytkownika', $idUzytkownika, PDO::PARAM_INT);
            $stmt->execute();
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($messages) {
                echo json_encode($messages);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'No chat messages found for this user']);
            }
            break;

        case 'getChatMessagesByCampaign':
            $idKampanii = $params['idKampanii'] ?? null;

            if (!$idKampanii) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing campaign ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, idKampani, czas, idUzytkownika, tresc FROM chatwpis WHERE idKampani = :idKampani");
            $stmt->bindParam(':idKampani', $idKampanii, PDO::PARAM_INT);
            $stmt->execute();
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($messages) {
                echo json_encode($messages);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'No chat messages found for this campaign']);
            }
            break;

        case 'getItem':
            $id = $params['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing item ID']);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, typ, nazwa, opis, staty FROM przedmiot WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $item = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($item) {
                echo json_encode($item);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Item not found']);
            }
            break;

            case 'getCechy':
                $stmt = $conn->prepare("SELECT id, nazwa, opis, modyfikator FROM cecha");
                $stmt->execute();
                $traits = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
                if ($traits) {
                    echo json_encode($traits);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'No traits found']);
                }
                break;

            case 'getCharacterTraits':
                $idPostaci = $params['idPostaci'] ?? null;
        
                if (!$idPostaci) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Missing character ID']);
                    exit;
                }
        
                $stmt = $conn->prepare("
                    SELECT c.id, c.nazwa, c.opis, c.modyfikator
                    FROM cechapostaci cp
                    INNER JOIN cecha c ON cp.idCechy = c.id
                    WHERE cp.idPostaci = :idPostaci
                ");
                $stmt->bindParam(':idPostaci', $idPostaci, PDO::PARAM_INT);
                $stmt->execute();
                $traits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                if ($traits) {
                    echo json_encode($traits);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'No traits found for this character']);
                }
                break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
