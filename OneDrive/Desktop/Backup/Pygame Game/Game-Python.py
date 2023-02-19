import pygame
import sys
import random

# Initialize the game
pygame.init()

# Create the screen
screen = pygame.display.set_mode(size=(800,600))

#Setting the title and the logo
logo_path = 'images\space-rocket-launch.png'
pygame.display.set_caption('Cosmo Fighters', 
                           'Shuttle')
logo = pygame.image.load(logo_path)
pygame.display.set_icon(logo)

# Preparing the playerimage and its initial position on the screen
player_path = "images\space-invaders.png"
player = pygame.image.load(player_path)
player = pygame.transform.scale(player, (60,80))
playerx, playery = 370,420
playerx_change ,playery_change = 0,0
enemy_left, enemy_right = True, False

# Preparing the enemyimage and its initial position on the screen
enemy_path = 'images\\alien.png'
enemy = pygame.image.load(enemy_path)
enemy = pygame.transform.scale(enemy, (40,50))
enemyx, enemyy = random.randint(0,760), random.randint(10,100)
enemyx_change ,enemyy_change = 0,75
enemy_left, enemy_right = True, False
respawn = False

background_path = "images\\background.jpeg"
background = pygame.image.load(background_path)

background_sound_path = "music\Electronic-background-music-90-bpm.mp3"
shoot_sound_path = "music\mixkit-laser-cannon-shot-1678.wav"
score_sound_path = "music\mixkit-falling-hit-on-gravel-756.wav"
pygame.mixer.music.load(background_sound_path)
pygame.mixer.music.play()

bullet_path = "images\\bullet.png"
bullet = pygame.image.load(bullet_path)
bullet = pygame.transform.scale(bullet,(15,25))
bulletx, bullety = 0,0
bulletx_change, bullety_change = 0,-0.8

score = 0
max_score = 0
font = pygame.font.Font('freesansbold.ttf', 32)
textX, textY = 10,5

game_over_path = "images\game-over.png"
game_over = pygame.image.load(game_over_path)
game_over = pygame.transform.scale(game_over, (400,300))


while(True):
    
    # Maintaining the screen on while the X button is not pressed
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            break
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                if playerx>0 :
                    playerx_change=-0.5
            if event.key == pygame.K_RIGHT:
                if playerx<740:
                    playerx_change=0.5
            # if event.key == pygame.K_UP:
            #     if playery>0:
            #         playery_change=-0.5
            # if event.key == pygame.K_DOWN:
            #     if playery<520:
            #         playery_change=0.5
            if event.key == pygame.K_SPACE:
                if bullety <10:
                    shoot_sound = pygame.mixer.Sound(shoot_sound_path)
                    shoot_sound.play()
                    bulletx, bullety = playerx+30, playery 
                              
                
    # Filling the screen with a color
    screen.fill(color="#FFFFFF")  # even we can give rgb (128,0,0)
    pygame.display.update()
    
    # Applying the background 
    # screen.blit(background, (0,0))
    # pygame.display.update()
            
    # Adding the image to the screen
    
    if respawn:
        enemyx, enemyy = random.randint(0,760), random.randint(10,100)
        respawn = False
    screen.blit(player, (playerx, playery))
    screen.blit(enemy, (enemyx, enemyy))
    screen.blit(bullet, (bulletx, bullety))
    text = font.render("Score : "+str(score), True, "#000000")
    text_alt = font.render("Max Score : "+str(max_score), True, "#000000")
    screen.blit(text, (textX, textY))
    screen.blit(text_alt, (textX, textY+35))
    
    pygame.display.update()
    
    # Adding the motion to the image :
    # playerx +=1 # moves right
    # playery -=1 # moves up
    # playerx -=1 # moves left
    # playery += # moves down
    if enemy_left :
        if enemyx>2:
            enemyx_change = -1.5
        if enemyx<=0:
            enemy_left=False
            enemy_right=True
            enemyy +=(600+enemyy_change)
            enemyy %=600
    if enemy_right :
        if enemyx<760:
            enemyx_change = +1.5
        if enemyx>=758:
            enemy_left=True
            enemy_right=False
            enemyy +=(600+enemyy_change)
            enemyy %=600
    
    
    if(bulletx >= enemyx and bulletx+15 <= enemyx+40 and bullety<enemyy+50 and bullety+25>enemyy):
        score+=1
        score_sound = pygame.mixer.Sound(score_sound_path)
        score_sound.play()
        respawn = True
    
    playerx +=(800+playerx_change)
    playerx %=800
    playery +=(600+playery_change)
    playery %=600
    
    enemyx +=(800+enemyx_change)
    enemyx %=800
    

    bullety+= bullety_change
    pygame.draw.line(screen, "#000000", (0,410), (799,410), 3)
    pygame.display.update()
    if( enemyy > 370):
        while(True):
            leave = False
            screen.blit(game_over, (200,150))
            pygame.display.update()
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        leave = True
                        break
            if leave:
                leave = False
                respawn = True
                max_score = max(max_score, score)
                score = 0
                break