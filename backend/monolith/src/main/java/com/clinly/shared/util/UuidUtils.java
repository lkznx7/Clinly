package com.clinly.shared.util;

import java.util.UUID;

public final class UuidUtils {

    private UuidUtils() {}

    public static UUID fromString(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return UUID.fromString(value);
    }
}
