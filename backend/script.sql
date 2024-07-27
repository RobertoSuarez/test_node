select get_total_turnos(9, CURRENT_TIMESTAMP);

	
CREATE OR REPLACE FUNCTION get_total_turnos(user_id INT, turno_date TIMESTAMPTZ)
RETURNS INT AS $$
DECLARE
    total_turnos INT;
    user_role TEXT;
BEGIN
    -- Obtener el rol del usuario
    SELECT r."rolName" INTO user_role
    FROM "user" u
    INNER JOIN "rol" r ON u."rolId" = r."id"
    WHERE u."id" = user_id;

    -- Condiciones según el rol del usuario
    IF user_role = 'GESTOR' THEN
        SELECT 
            COUNT(*) 
        INTO 
            total_turnos
        FROM 
            "turn" t
        INNER JOIN 
            "cash" c ON t."cashCashId" = c."cashId"
        INNER JOIN 
            "user_cash_cash" ucc ON ucc."cashCashId" = c."cashId"
        INNER JOIN 
            "user" u2 ON ucc."userId" = u2."id"
        WHERE 
            u2."rolId" = (SELECT id FROM "rol" WHERE "rolName" = 'CAJERO') AND
            t."userGestorId" = user_id AND
            t."date"::DATE = turno_date::DATE;
    ELSIF user_role = 'ADMIN' THEN
        SELECT 
            COUNT(*) 
        INTO 
            total_turnos
        FROM 
            "turn"
        WHERE 
            "date"::DATE = turno_date::DATE;
    ELSIF user_role = 'CAJERO' THEN
        SELECT 
            COUNT(*) 
        INTO 
            total_turnos
        FROM 
            "turn" t
        WHERE 
            t."userGestorId" = user_id AND
            t."date"::DATE = turno_date::DATE;
    ELSE
        total_turnos := 0;
    END IF;

    RETURN total_turnos;
END;
$$ LANGUAGE plpgsql;