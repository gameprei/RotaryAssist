create database if not exists rotarydb

create table if not exists BENEFICIARIOS(
	NOME VARCHAR(80) NOT NULL,
    CPF VARCHAR(11) NOT NULL PRIMARY KEY,
    RG VARCHAR(9) NOT NULL,
    DATA_NASCIMENTO DATE NOT NULL,
    TELEFONE VARCHAR(11) NOT NULL,
    EMAIL VARCHAR(255),
    ENDERECO VARCHAR(255) NOT NULL,
    BAIRRO VARCHAR(80) NOT NULL,
    CIDADE VARCHAR(80) NOT NULL,
    UF CHAR(2) NOT NULL,
    CEP VARCHAR(8) NOT NULL,
    CONTATO_EMERGENCIA VARCHAR(80),
    TELEFONE_EMERGENCIA VARCHAR(11),
    NECESSIDADE_ESPECIFICA VARCHAR(255)
);

INSERT INTO BENEFICIARIOS (
    NOME, CPF, RG, DATA_NASCIMENTO, TELEFONE, EMAIL, ENDERECO, BAIRRO, CIDADE, UF, CEP, 
    CONTATO_EMERGENCIA, TELEFONE_EMERGENCIA, NECESSIDADE_ESPECIFICA
) VALUES 
(
    'MARIA SILVA SANTOS', '12345678901', '123456789', '1985-03-15', '11987654321', 
    'maria.silva@email.com', 'Rua das Flores, 123', 'Jardim Paulista', 'São Paulo', 'SP', '01415000',
    'João Silva', '11987654322', 'Necessita de acompanhamento psicológico semanal'
),
(
    'PEDRO HENRIQUE OLIVEIRA', '23456789012', '234567890', '1990-07-22', '11976543210',
    'pedro.oliveira@email.com', 'Avenida Brasil, 456', 'Centro', 'Rio de Janeiro', 'RJ', '20040000',
    'Ana Oliveira', '11976543211', 'Uso regular de medicamentos controlados para hipertensão'
),
(
    'ANA CAROLINA COSTA', '34567890123', '345678901', '1978-11-30', '11965432109',
    'ana.costa@email.com', 'Rua XV de Novembro, 789', 'Batel', 'Curitiba', 'PR', '80420000',
    'Carlos Costa', '11965432110', 'Mobilidade reduzida - necessita de cadeira de rodas'
),
(
    'LUCAS FERNANDES PEREIRA', '45678901234', '456789012', '1995-05-18', '11954321098',
    'lucas.pereira@email.com', 'Rua da Paz, 321', 'Savassi', 'Belo Horizonte', 'MG', '30140000',
    'Fernanda Pereira', '11954321099', 'Dieta especial sem glúten e lactose'
),
(
    'JULIANA ALMEIDA RIBEIRO', '56789012345', '567890123', '1982-09-08', '11943210987',
    'juliana.ribeiro@email.com', 'Avenida Paulista, 1000', 'Bela Vista', 'São Paulo', 'SP', '01310000',
    'Roberto Ribeiro', '11943210988', 'Sessões de fisioterapia 3 vezes por semana'
),
(
    'RAFAEL MENDONÇA SOUZA', '67890123456', '678901234', '1998-12-25', '11932109876',
    'rafael.souza@email.com', 'Rua do Sol, 654', 'Boa Viagem', 'Recife', 'PE', '51021000',
    'Patrícia Souza', '11932109877', 'Acompanhamento para transtorno de ansiedade'
),
(
    'FERNANDA LIMA CASTRO', '78901234567', '789012345', '1975-02-14', '11921098765',
    'fernanda.castro@email.com', 'Alameda Santos, 987', 'Jardins', 'São Paulo', 'SP', '01418000',
    'Ricardo Castro', '11921098766', 'Deficiência visual - necessita de material em braile'
),
(
    'BRUNO MARTINS FERREIRA', '89012345678', '890123456', '1992-08-03', '11910987654',
    'bruno.ferreira@email.com', 'Rua das Palmeiras, 258', 'Moinhos de Vento', 'Porto Alegre', 'RS', '90570000',
    'Camila Ferreira', '11910987655', 'Tratamento renal - sessões de hemodiálise'
),
(
    'CAMILA SANTOS GOMES', '90123456789', '901234567', '1988-04-12', '11909876543',
    'camila.gomes@email.com', 'Avenida Beira Mar, 147', 'Meireles', 'Fortaleza', 'CE', '60165000',
    'Marcos Gomes', '11909876544', 'Suporte para depressão e acompanhamento psiquiátrico'
),
(
    'DIEGO RODRIGUES BARBOSA', '01234567890', '012345678', '1993-06-28', '11998765432',
    'diego.barbosa@email.com', 'Rua da Aurora, 753', 'Santo Amaro', 'Recife', 'PE', '50100000',
    'Tatiane Barbosa', '11998765433', 'Necessita de prótese auditiva e acompanhamento fonoaudiológico'
);

CREATE TABLE if not exists equipamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL,
    patrimonio VARCHAR(20) UNIQUE NOT NULL,
    estado_conservacao ENUM('Disponível', 'Em uso', 'Manutenção') DEFAULT 'Disponível',
    data_aquisicao DATE NOT NULL
);

-- Inserção de dados para cadeiras de rodas e cadeiras para banho
INSERT INTO equipamentos (nome, descricao, tipo, patrimonio, estado_conservacao, data_aquisicao) VALUES
-- Cadeiras de Rodas
('Cadeira de Rodas Padrão', 'Cadeira de rodas dobrável, aço carbono, rodas de 24 polegadas', 'Cadeira de Rodas', 'CR-001', 'Em uso', '2024-01-15'),
('Cadeira de Rodas Transporte', 'Cadeira de rodas leve para transporte, peso 12kg', 'Cadeira de Rodas', 'CR-002', 'Disponível', '2024-02-20'),
('Cadeira de Rodas Motorizada', 'Cadeira de rodas elétrica, bateria de lítio, controle joystick', 'Cadeira de Rodas', 'CR-003', 'Manutenção', '2024-03-10'),
('Cadeira de Rodas Pediátrica', 'Cadeira de rodas infantil, ajustável, cores variadas', 'Cadeira de Rodas', 'CR-004', 'Disponível', '2024-01-30'),
('Cadeira de Rodas Banho', 'Cadeira de rodas especial para banho, material resistente à água', 'Cadeira de Rodas', 'CR-005', 'Em uso', '2024-02-28'),

-- Cadeiras para Banho
('Cadeira para Banho Fixa', 'Cadeira para banho fixa, com encosto alto e apoio de braços', 'Cadeira para Banho', 'CB-001', 'Disponível', '2024-03-05'),
('Cadeira para Banho Portátil', 'Cadeira para banho dobrável, ajustável em altura', 'Cadeira para Banho', 'CB-002', 'Em uso', '2024-01-22'),
('Cadeira para Banho com Rodas', 'Cadeira para banho com rodas travas, material antiderrapante', 'Cadeira para Banho', 'CB-003', 'Disponível', '2024-02-14'),
('Cadeira para Banho Inox', 'Cadeira para banho em aço inoxidável, resistente à umidade', 'Cadeira para Banho', 'CB-004', 'Manutenção', '2024-03-18'),
('Cadeira para Banho Reclinável', 'Cadeira para banho reclinável, com apoio para cabeça', 'Cadeira para Banho', 'CB-005', 'Em uso', '2024-01-08'),

-- Mais exemplos para completar
('Cadeira de Rodas Esportiva', 'Cadeira de rodas para atividades esportivas, leve e manobrável', 'Cadeira de Rodas', 'CR-006', 'Disponível', '2024-03-22'),
('Cadeira de Rodas Elevatória', 'Cadeira de rodas com função elevatória para transferência', 'Cadeira de Rodas', 'CR-007', 'Em uso', '2024-02-05'),
('Cadeira para Banho com Assento Giratório', 'Cadeira para banho com assento giratório para facilidade de uso', 'Cadeira para Banho', 'CB-006', 'Disponível', '2024-03-12'),
('Cadeira para Banho de Canto', 'Cadeira para banho especial para box de canto', 'Cadeira para Banho', 'CB-007', 'Manutenção', '2024-01-18');

-- Inserção adicional para equipamentos mais específicos
INSERT INTO equipamentos (nome, descricao, tipo, patrimonio, estado_conservacao, data_aquisicao) VALUES
('Cadeira de Rodas com Amortecedor', 'Cadeira de rodas com sistema de amortecedor para maior conforto', 'Cadeira de Rodas', 'CR-008', 'Disponível', '2024-03-25'),
('Cadeira para Banho com Apoio Lombar', 'Cadeira para banho com apoio lombar ajustável e encosto ergonômico', 'Cadeira para Banho', 'CB-008', 'Em uso', '2024-02-12'),
('Cadeira de Rodas Stand-up', 'Cadeira de rodas que permite posição semi-em pé', 'Cadeira de Rodas', 'CR-009', 'Disponível', '2024-03-08'),
('Cadeira para Banho com Alça de Transferência', 'Cadeira para banho com alças para facilitar transferência do usuário', 'Cadeira para Banho', 'CB-009', 'Em uso', '2024-01-25'),
('Cadeira de Rodas com Tilt', 'Cadeira de rodas com sistema de inclinação para alívio de pressão', 'Cadeira de Rodas', 'CR-010', 'Manutenção', '2024-03-15');

CREATE TABLE membros (
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) primary KEY,
    rg VARCHAR(20),
    email VARCHAR(150),
    telefone VARCHAR(20),
    data_nascimento DATE,
    data_ingresso DATE,
    endereco VARCHAR(200),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2) NOT NULL, 
    cep VARCHAR(8),
    cargo VARCHAR(100),
    profissao VARCHAR(100),
    empresa VARCHAR(150)
);

-- Inserção de dados com UF
INSERT INTO membros (
    nome, cpf, rg, email, telefone, data_nascimento, data_ingresso,
    endereco, bairro, cidade, uf, cep, cargo, profissao, empresa
) VALUES
('MARIA SILVA SANTOS', '12345678901', '123456789', 'maria.silva@email.com', '11987654321',
 '1985-03-15', '2023-01-10', 'Rua das Flores, 123', 'Jardim Paulista', 'São Paulo', 'SP', '01415000',
 'Coordenadora', 'Psicóloga', 'Instituto Vida'),
 
('JOÃO CARLOS PEREIRA', '23456789012', '987654321', 'joao.pereira@email.com', '11999887766',
 '1990-07-22', '2022-11-03', 'Av. Paulista, 1500', 'Bela Vista', 'São Paulo', 'SP', '01310000',
 'Supervisor', 'Administrador', 'GlobalCorp'),
 
('ANA BEATRIZ MOURA', '34567890123', '456789123', 'ana.moura@email.com', '11988776655',
 '1992-04-08', '2023-03-15', 'Rua Harmonia, 56', 'Vila Madalena', 'São Paulo', 'SP', '05455000',
 'Secretária', 'Assistente Administrativa', 'HealthPlus'),
 
('CARLOS EDUARDO LIMA', '45678901234', '741258963', 'carlos.lima@email.com', '11977665544',
 '1988-12-01', '2021-09-29', 'Rua dos Pinheiros, 900', 'Pinheiros', 'São Paulo', 'SP', '05422002',
 'Analista', 'Engenheiro de Produção', 'TechWay'),
 
('JULIANA OLIVEIRA', '56789012345', '852369741', 'juliana.oli@email.com', '11966554433',
 '1995-09-17', '2023-02-20', 'Rua Aurora, 200', 'Centro', 'São Paulo', 'SP', '01014000',
 'Assistente Social', 'Assistente Social', 'Casa Solidária'),
 
('MARCOS VINICIUS GOMES', '67890123456', '369147258', 'marcos.vg@email.com', '11955443322',
 '1983-10-30', '2020-06-12', 'Rua Turiassu, 1550', 'Perdizes', 'São Paulo', 'SP', '05005000',
 'Gerente', 'Administrador', 'MegaStore'),
 
('PATRICIA LOPES FERNANDES', '78901234567', '159357456', 'patricia.lf@email.com', '11944332211',
 '1987-02-19', '2021-05-03', 'Av. Rebouças, 2300', 'Jardim América', 'São Paulo', 'SP', '01402001',
 'Consultora', 'Advogada', 'Legal&Co'),
 
('RODRIGO ALMEIDA', '89012345678', '258963147', 'rodrigo.a@email.com', '11933221100',
 '1993-06-10', '2024-01-05', 'Rua Vergueiro, 2200', 'Vila Mariana', 'São Paulo', 'SP', '04102000',
 'Instrutor', 'Professor', 'UniEduca'),
 
('FERNANDA RIBEIRO', '90123456789', '951753852', 'fernanda.r@email.com', '11922110099',
 '1991-01-27', '2022-09-18', 'Av. Sumaré, 1800', 'Sumaré', 'São Paulo', 'SP', '01252000',
 'Especialista', 'Nutricionista', 'GreenLife'),
 
('LEONARDO BARROS', '01234567890', '147258369', 'leonardo.b@email.com', '11911009988',
 '1989-08-14', '2023-04-01', 'Rua Oscar Freire, 900', 'Jardins', 'São Paulo', 'SP', '01426000',
 'Coordenador', 'Designer', 'StudioX');