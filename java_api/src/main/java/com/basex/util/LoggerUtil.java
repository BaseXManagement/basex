package com.basex.util;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LoggerUtil {

    private static final Logger defaultLogger = Logger.getLogger(LoggerUtil.class.getName());

    public static <T> void error(Class<T> clazz, String message) {
        Logger logger = Logger.getLogger(clazz.getName());
        logger.log(Level.SEVERE, "ERROR in Class: {0} -> Error: {1}", new Object[]{clazz.getSimpleName(), message});
    }

    public static <T> void info(Class<T> clazz, String message) {
        Logger logger = Logger.getLogger(clazz.getName());
        logger.log(Level.INFO, "INFO in CLass: {0} -> {1}", new Object[]{clazz.getSimpleName(), message});
    }

    public static <T> void debug(Class<T> clazz, String message) {
        Logger logger = Logger.getLogger(clazz.getName());
        logger.log(Level.FINE, "DEBUG ERROR in Class: {0}: ->  {1}", new Object[]{clazz.getSimpleName(), message});
    }


}
