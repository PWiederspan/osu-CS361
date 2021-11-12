from tkinter import *
from tkinter import filedialog
from tkinter import filedialog as fd
import csv
import datetime
import os.path


class Window:

    def __init__(self, master):
        types = ["No Description", "Description"]
        self.variable = StringVar()
        self.variable.set(types[0])
        self.dropDown = OptionMenu(root, self.variable,*types).grid(row=0, column=0)
        self.filename=""
        csvfile=Label(root, text="File").grid(row=1, column=0)
        bar=Entry(master).grid(row=1, column=1)

        #Buttons
        y=7
        self.cbutton= Button(root, text="Create List", command=self.process_csv)
        y+=1
        self.cbutton.grid(row=10, column=3, sticky = W + E)
        self.bbutton= Button(root, text="Browse", command=self.browsecsv)
        self.bbutton.grid(row=1, column=3)
        self.qbutton = Button(text="Exit", command=self.close_window).grid(row=11, column=1)

    def display_selected(self,choice):
        choice = self.variable.get()
        print(choice)

    def browsecsv(self):
        Tk().withdraw()
        self.filename = fd.askopenfilename()

    def close_window(self):
        root.destroy()

    def process_csv(self):
        choice = self.variable.get()
        now = datetime.datetime.now()
        file = "AutoName"+"-"+str(now.hour)+":"+str(now.minute)+":"+str(now.second)+".txt"
        desktop_file = os.path.expanduser("~/Desktop/"+file)
        f = open(desktop_file, "w")
        if str(choice) == "No Description":
            with open(self.filename) as csvfile:
                datareader = csv.reader(csvfile)
                for row in datareader:
                    name = row[0]
                    f = open(desktop_file, "a")
                    f.write('<li><a href="https:u//babynames.com/name/' + str(name) + '" target="_BLANK"rel="noopener">' + str(name) + '</a></li>')
                    f.write('\n')
                    f.close()
        elif str(choice) == "Description":
            with open(self.filename) as csvfile:
                datareader = csv.reader(csvfile)
                for row in datareader:
                    name = row
                    f = open(desktop_file, "a")
                    f.write('<div class="mostpopular"><a target="_BLANK" rel="noopener"><strong>'+str(name)+'</strong></a> ~ <i>B</i></div>')
                    f.write('\n')
                    f.close()

root = Tk()
window=Window(root)

root.title('Auto Names List')
root.geometry('500x100')
root.configure(background='white')

# infinite loop
root.mainloop()
