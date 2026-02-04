export const TECH_STACK_ACTIVE_THRESHOLD = 0.70; // Interaction starts earlier
export const TECH_STACK_VISUAL_COMPLETE = 0.85;  // Animation finishes here
export const TECH_STACK_END_THRESHOLD = 0.95;    // Interaction ends BEFORE the section ends

export const SCROLL_ZONES = {
    HERO_END: 0.25,
    TECH_STACK_START: 0.25,
    TECH_STACK_ACTIVE: TECH_STACK_ACTIVE_THRESHOLD,
    TECH_STACK_COMPLETE: TECH_STACK_VISUAL_COMPLETE,
    TECH_STACK_END: TECH_STACK_END_THRESHOLD,
    EXPERIENCE_START: 1.0,
} as const;
