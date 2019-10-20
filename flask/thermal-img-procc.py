import sys
import numpy as np
import cv2
import matplotlib as mpl
import matplotlib.cm as mtpltcm

def main(argv):
    # cap = cv2.VideoCapture(0)
     #initialize the colormap (jet)
    colormap = mpl.cm.jet
    #add a normalization
    cNorm = mpl.colors.Normalize(vmin=0, vmax=255)
    #init the mapping
    scalarMap = mtpltcm.ScalarMappable(norm=cNorm, cmap=colormap)
    #...
    image  = cv2.imread("/home/amoghjrules/Desktop/InOut 2019/therm1.jpg")


    while (True):
        # Capture frame-by-frame
        # ret, frame = cap.read()

        # Our operations on the frame come here
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # gray_rgb = cv2.cvtColor(gray,cv2.COLOR_BGR2RGB)
        colors = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        colors = scalarMap.to_rgba(gray)
        temp = colors
        temp=colors[:,:,[2,1,0]]
        colors =temp
        # colors = cv2.cvtColor(temp,cv2.COLOR_RGB2GRAY)
        lower_red = np.array([0,0,10])
        upper_red = np.array([130,255,255])

        mask = cv2.inRange(colors, lower_red, upper_red)
        res = cv2.bitwise_and(colors,colors, mask= mask)
        # colors = cv2.cvtColor(colors,cv2.COLOR_BGR2RGB)
        cv2.imshow('mask',temp)
        # Display the resulting frame
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # When everything done, release the capture
    # cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    sys.exit(main(sys.argv))